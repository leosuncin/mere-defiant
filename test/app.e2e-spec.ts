import { HttpStatus } from '@nestjs/common'
import { spec } from 'pactum'

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    await spec()
      .get('/')
      .expectStatus(HttpStatus.OK)
      .expectBody('Hello World!');
  });
});
