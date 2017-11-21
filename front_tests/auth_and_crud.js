module.exports = {
    'get to register page': (browser) => {
        browser
        // Load the page at the launch URL
            .url(browser.launchUrl)
            // wait for page to load
            .waitForElementVisible('p', 1000)
            // click on the Get Started button
            .click('.btn-success');

        browser.assert.urlContains('register');
    },
    'get to login page': (browser) => {
        browser
        // click link to login page
            .click('p>a');

        browser.assert.urlContains('login');
    },
    'logging in': (browser) => {
        // login
        browser
            .waitForElementVisible('#loginForm', 1000)
            // set username
            .setValue('input[type=text]', 'arnold')
            // set password
            .setValue('input[type=password', 'test')
            // submit the form
            .click('button')
            // wait for the page to load
            .waitForElementVisible('#newBucketForm', 1000);

        // List of buckets loaded
        browser.assert.elementPresent("#list-of-buckets");

        browser.assert.urlContains('bucketlists')

    },
    'create a bucket-list': (browser) => {
        browser
            .setValue('input#newBucketName', 'read a book')
            // submit the form
            .click('#add-bucketlist')
            // wait for the list to update
            .pause(1000);

        // List of buckets loaded
        browser.expect.element('#list-of-buckets').text.to.contain('read a book');

    },
    'edit a bucket-list': (browser) => {
        browser
            .click('.glyphicon-pencil')
            .pause(1000)
            .setValue('form#editBucketForm>input', 'go cycling')
            // submit the form
            .click('i.glyphicon.glyphicon-ok')
            // wait for the list to update
            .pause(1000);

        // List of buckets loaded
        browser.expect.element('#list-of-buckets').text.to.contain('go cycling');

    },
    'delete a bucket-list': (browser) => {
        browser
            .click('.glyphicon-remove')
            // wait for the list to update
            .pause(1000);

        browser.expect.element('#list-of-buckets').text.to.not.contain('go cycling');

    },
    'logging out': (browser) => {
        browser
        // Find and click on the logout link
            .click('.glyphicon-log-out')
            // Wait for the next content to load
            .waitForElementVisible('p', 1000);

        // Login form loaded
        browser.assert.elementPresent(".jumbotron");
    },
    'close': (browser) => browser.end(),
};

