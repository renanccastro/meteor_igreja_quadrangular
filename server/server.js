Meteor.methods({
    'submitMessage': function(title, author, date, url) {
        console.log(url);

        Messages.insert({
            title: title,
            author: author,
            date: date,
            url: url
        })
    },
    'submitSubmission': function(name, email, quadro, files, comments) {
        console.log(files);

        Submissions.insert({
            name: name,
            email: email,
            quadro: quadro,
            files: files,
            comments: comments
        })
    }

});
S3.config = {
    key: 'AKIAI4IAL6KXQC2PFT5A',
    secret: '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',
    bucket: 'esfera-bucket'
};