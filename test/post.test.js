const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = require('chai').should();

chai.use(chaiHttp);

const {expect} = chai;

describe('Testing the posts endpoints:', () => {
    it('It should create a posts', (done) => {
        const post = {
            userId: '1',
            title: 'First Awesome post',
            content:'This is the awesome post'
        };
        chai.request(app)
            .post('/api/v1/posts')
            .set('Accept', 'application/json')
            .send(post)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                done();
            });
    });

    it('It should not create a post with incomplete parameters', (done) => {
        const post = {
            title: '$9.99',
            content: 'This is the awesome post'
        };
        chai.request(app)
            .post('/api/v1/posts')
            .set('Accept', 'application/json')
            .send(post)
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });

    it('It should get all posts', (done) => {
        chai.request(app)
            .get('/api/v1/posts')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('It should get a particular post', (done) => {
        const postId = 1;
        chai.request(app)
            .get(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('It should not get a particular post with invalid id', (done) => {
        const postId = 8888;
        chai.request(app)
            .get(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    it('It should not get a particular post with non-numeric id', (done) => {
        const postId = 'aaa';
        chai.request(app)
            .get(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });

    it('It should update a post', (done) => {
        const postId = 1;
        const updatedpost = {
            userId: postId,
            title: 'Updated Awesome post',
            content: 'We have updated the price'
        };
        chai.request(app)
            .put(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedpost)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.post.userId).equal(updatedpost.userId);
                expect(res.body.post.title).equal(updatedpost.title);
                expect(res.body.post.content).equal(updatedpost.content);
                done();
            });
    });

    it('It should not update a post with invalid id', (done) => {
        const postId = '9999';
        const updatedpost = {
            userId: postId,
            title: 'Updated Awesome post',
            content: 'We have updated the price'
        };
        chai.request(app)
            .put(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedpost)
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });

    it('It should not update a post with non-numeric id value', (done) => {
        const postId = 'ggg';
        const updatedpost = {
            userId: postId,
            title: 'Updated Awesome post',
            content: 'We have updated the price'
        };
        chai.request(app)
            .put(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedpost)
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });


    it('It should delete a post', (done) => {
        const postId = 1;
        chai.request(app)
            .delete(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('It should not delete a post with invalid id', (done) => {
        const postId = 777;
        chai.request(app)
            .delete(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });

    it('It should not delete a post with non-numeric id', (done) => {
        const postId = 'bbb';
        chai.request(app)
            .delete(`/api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
    });
});
