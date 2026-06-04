#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Post-deploy checks for the Accept-Language locale redirect."""

# Built-in modules #
import os, http.client
from functools import cached_property
from urllib.parse import urlparse

# External modules #
import pytest

################################################################################
class LocaleRedirect:
    """
    Performs a HEAD request to the site root with a chosen Accept-Language and
    exposes the Location header the server returns, without following the
    redirect (like `curl -I`). This is how we verify the Cloudflare Pages
    function in `functions/index.ts` picks the right locale. Set the SITE_URL
    environment variable to point the check at a preview deploy instead.
    """

    # Cloudflare's WAF 403s the default urllib agent, so send a browser UA #
    user_agent = (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )

    def __init__(self, accept_language):
        # Save the language preference to send in the request #
        self.accept_language = accept_language

    def __repr__(self):
        """A simple representation of this object to avoid memory addresses."""
        return "<%s object on '%s'>" % (self.__class__.__name__,
                                        self.accept_language)

    # --------------------------- Properties ----------------------------- #
    @cached_property
    def site_url(self):
        """
        The base URL under test, overridable via the SITE_URL environment
        variable so the same check can target a preview deploy.
        """
        return os.environ.get("SITE_URL", "https://sinclair.bio").rstrip("/")

    @cached_property
    def parsed(self):
        # Split the base URL into scheme and host parts #
        return urlparse(self.site_url)

    @cached_property
    def connection(self):
        # Use a TLS or plain connection depending on the URL scheme #
        host = self.parsed.netloc
        if self.parsed.scheme == "https":
            return http.client.HTTPSConnection(host, timeout=10)
        return http.client.HTTPConnection(host, timeout=10)

    @cached_property
    def headers(self):
        # Carry the language preference and a browser identity #
        return {"Accept-Language": self.accept_language,
                "User-Agent": self.user_agent}

    @cached_property
    def location(self):
        """
        The Location header the root returns for this Accept-Language, or an
        empty string when no redirect is issued, so a failing assertion still
        reads clearly.
        """
        self.connection.request("HEAD", "/", headers=self.headers)
        response = self.connection.getresponse()
        location = response.getheader("Location", "")
        response.read()
        self.connection.close()
        return location

################################################################################
class TestLocaleRedirect:
    """
    Asserts the site root sends a 302 to the expected /<locale>/ path for each
    Accept-Language header. Runs against the live site by default and turns
    green once the redirect function is deployed; run with `pytest test/`.
    """

    # --------------------------- Cases ---------------------------------- #
    @pytest.mark.parametrize("accept_language, locale", [
        ("fr-CH,fr;q=0.9,en;q=0.8", "fr"),
        ("en-US", "en"),
    ])
    def test_redirect(self, accept_language, locale):
        """The root sends a 302 to /<locale>/ matching the Accept-Language."""
        redirect = LocaleRedirect(accept_language)
        expected = "%s/%s/" % (redirect.site_url, locale)
        assert redirect.location == expected

################################################################################
if __name__ == "__main__":
    pytest.main([__file__, "-v"])
