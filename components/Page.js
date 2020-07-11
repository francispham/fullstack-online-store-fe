import Header from '../components/Header';
import Meta from '../components/Meta';

const Page = ({children}) => {
  return (
    <div>
      <Meta />
      <Header />
      <p>Hey I am the page component</p>
      {children}
    </div>
  )
};

export default Page;
