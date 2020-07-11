import App, { Container } from 'next/app';
import Page from '../components/Page'
class MyApp extends App {
  render () {
    const { Component } = this.props;

    return (
      <Container>
        <p>Hey I am the App, I'm on Every Page</p>
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
};

export default MyApp;