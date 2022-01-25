import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

    return (
      <div className="container mt-5 pt-2">
        <Head>
          <title>Motaseq</title>
          <meta name="description" content="Style your web pages easly" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        
        <div>
          <div className="container rounded shadow-lg p-3 w-75 bg-light">
            <div className="d-flex justify-content-center mt-3 mb-4">
                <Image src="/done.png" width={130} height={130} alt="Motaseq logo"/>
            </div>
            <h3 className="text-center fw-bold">Done</h3>
            <h5 className="text-center mt-5">Your project style has been saved. You can deploy it!</h5>
            <div className="container mt-3 pt-3">
            <div className="mt-5 text-center">
              <Link href="/">
                <a className="btn btn-dark">New project</a>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
}
