describe('process action', function () {
  it('calls dispatch twice on a successful request', function (done) {
    const middleware = require('lib/promiseMiddleware');
    const dispatch   = jasmine.createSpy();
    const action     = {
      type:    'TEST',
      extra:   'data',
      promise: new Promise(resolve => {
        resolve({ foo: 'bar' });
      })
    };

   middleware()(dispatch)(action)
      .then(success => {
        expect(success).toBeTruthy();

        expect(dispatch.calls.count()).toEqual(2);

        expect(dispatch.calls.allArgs()).toEqual([
          [
            {
              type:  'TEST_REQUEST',
              extra: 'data'
            }
          ],
          [
            {
              type:  'TEST',
              extra: 'data',
              res:   { foo: 'bar' }
            }
          ]
        ]);

        done();
      });
  });

  it('calls dispatch twice on failed request', function (done) {
    const middleware = require('lib/promiseMiddleware');
    const dispatch   = jasmine.createSpy();
    const TestError  = new Error('Totally legit error.');
    const action     = {
      type:    'TEST',
      extra:   'data',
      promise: new Promise((resolve, reject) => {
        reject(TestError);
      })
    };

    middleware()(dispatch)(action)
      .then(success => {
        expect(success).toBeFalsy();

        expect(dispatch.calls.count()).toEqual(2);

        expect(dispatch.calls.allArgs()).toEqual([
          [
            {
              type:  'TEST_REQUEST',
              extra: 'data'
            }
          ],
          [
            {
              type:  'TEST_FAILURE',
              extra: 'data',
              error: TestError
            }
          ]
        ]);

        done();
      });
  });
});
