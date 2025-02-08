const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../../src/config');

const api = axios.create({
  baseURL: config.baseUrl,
  validateStatus: false
});

describe('URL Shortener API Integration Tests', () => {
  let shortId;

  describe('Create Short URL', () => {
    it('should create a short URL successfully', async () => {
      const response = await api.post('/urls', {
        longUrl: 'https://example.com/test-page'
      });

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        shortId: expect.any(String),
        shortUrl: expect.stringContaining('/'),
        longUrl: 'https://example.com/test-page'
      });

      shortId = response.data.shortId;
    });

    it('should reject invalid URLs', async () => {
      const response = await api.post('/urls', {
        longUrl: 'not-a-valid-url'
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error');
    });
  });

  describe('URL Redirection', () => {
    it('should redirect to the original URL', async () => {
      const response = await api.get(`/${shortId}`, {
        maxRedirects: 0,
        validateStatus: false
      });

      expect(response.status).toBe(301);
      expect(response.headers.location).toBe('https://example.com/test-page');
    });

    it('should handle non-existent URLs', async () => {
      const response = await api.get('/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('URL Statistics', () => {
    it('should return URL statistics', async () => {
      const response = await api.get(`/urls/${shortId}/stats`);

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        shortId,
        longUrl: 'https://example.com/test-page',
        visits: expect.any(Number),
        createdAt: expect.any(String)
      });
    });

    it('should handle non-existent URLs', async () => {
      const response = await api.get('/urls/nonexistent/stats');
      expect(response.status).toBe(404);
    });
  });
});