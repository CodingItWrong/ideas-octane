import { module, test } from 'qunit';
import { visit, click, fillIn, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | administer quotes', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('allows adding, editing, and deleting quotes', async function (assert) {
    await setUpSource(this.server);

    const quote = 'Unfortunately, something will change.';
    await addQuote(assert, quote);
  });

  async function setUpSource(server) {
    const authorName = 'Sandi Metz';
    const sourceTitle = 'Practical Object-Oriented Design';

    const book = server.create('medium', { name: 'Book' });
    const author = server.create('author', { name: authorName });
    const source = server.create('source', {
      title: sourceTitle,
      author,
      medium: book,
    });

    await authenticateSession({ access_token: 'ABC123' });
    await visit(`/sources/${source.id}`);
  }

  async function addQuote(assert, quote) {
    await fillIn('[data-test-quote-field] textarea', quote);
    await click('[data-test-save-quote-button]');
    assert.dom(`[data-test-quote-text]`).hasText(quote);
  }
});
