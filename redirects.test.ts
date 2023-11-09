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
})
