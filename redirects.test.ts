import { describe, expect, test } from 'bun:test'

describe('Redirects', () => {
  test('http://kulturland.de redirects to http://www.kulturland.de', () =>
    fetch('http://kulturland.de', { redirect: 'manual' }).then((res) => {
      expect(res.status).toEqual(301)
      expect(res.headers.get('location')).toEqual('http://www.kulturland.de')
    }))
  test('http://www.kulturland.de redirects to https://www.kulturland.de', () =>
    fetch('http://www.kulturland.de', { redirect: 'manual' }).then((res) => {
      expect(res.status).toEqual(301)
      expect(res.headers.get('location')).toEqual('https://www.kulturland.de/')
    }))
  test('https://kulturland.de has correct certificate', () =>
    expect(
      fetch('https://kulturland.de', {
        redirect: 'manual',
      })
    ).resolves.toBeTruthy())
  test('https://kulturland.de to https://www.kulturland.de', () =>
    fetch('https://kulturland.de', {
      redirect: 'manual',
      tls: {
        rejectUnauthorized: false,
      },
    }).then((res) => {
      expect(res.status).toEqual(301)
      expect(res.headers.get('location')).toEqual('https://www.kulturland.de/')
    }))
})
