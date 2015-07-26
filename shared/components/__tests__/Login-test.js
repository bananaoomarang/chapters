describe('Login', function () {
  const React     = require('react/addons');
  const Login     = require('components/Login').DecoratedComponent;
  const TestUtils = React.addons.TestUtils;

  const user = {
    name:     'William',
    password: 'shakemysp5ar'
  };

  it('Submits when form complete', function () {
      const props = {
        dispatch: jasmine.createSpy()
      };

      var login = TestUtils.renderIntoDocument(
        <Login {...props} />
      );

      var form = TestUtils.findRenderedDOMComponentWithTag(login, 'form');

      TestUtils.Simulate.change(form, {
        target: {
          name:  'username',
          value: user.name
        }
      });

      TestUtils.Simulate.change(form, {
        target: {
          name:  'password',
          value: user.password
        }
      });

      expect(login.state).toEqual({
        username: 'William',
        password: user.password
      });

      TestUtils.Simulate.submit(form);

      expect(props.dispatch.calls.count()).toEqual(1);
      expect(props.dispatch.calls.first().args).toBeTruthy();
  });

  it('Doesn\'t submit form & sets error when not complete', function () {
      const props = {
        dispatch: jasmine.createSpy(),
        error:    'Please fill in form'
      };

      var login = TestUtils.renderIntoDocument(
        <Login {...props} />
      );

      var form  = TestUtils.findRenderedDOMComponentWithTag(login, 'form');
      var error = TestUtils.findRenderedDOMComponentWithTag(login, 'a');

      TestUtils.Simulate.submit(form);

      TestUtils.Simulate.change(form, {
        target: {
          name:  'username',
          value: user.name
        }
      });

      TestUtils.Simulate.submit(form);

      expect(login.state.error).toEqual('Please fill in form');
      expect(props.dispatch.calls.count()).toEqual(0);

      expect(error.getDOMNode().textContent).toEqual('Please fill in form');
      expect(error.props.className.match('error-msg')).toBeTruthy();
      expect(error.props.className.match('invisible')).toBeFalsy();
  });
});
