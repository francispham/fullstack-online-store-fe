import Link from 'next/link';

const Home = props => {
  return (
    <div>
      Hello World!!!
      <Link href="/sell">
        <a>Sell</a>
      </Link>
    </div>
  )
}

export default Home;
