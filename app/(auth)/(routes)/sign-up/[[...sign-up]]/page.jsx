import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return( 

<section className="bg-gray-100">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-white lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt="logo"
        src="./loginbk.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
      <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
          <Image src='./logo.png' 
          alt="logo"
          width={250} height={100}/>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to File Sharing App 
        </h2>

        <p className="mt-4 leading-relaxed text-gray-900/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
          quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href="#"
          >
            <span className="sr-only">Home</span>
            <Image src='/logo.png' 
            alt="logo"
            width={250} height={100}/>
          </a>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 py-5 sm:text-3xl md:text-4xl">
            Welcome to CloudSharing
          </h1>

          {/* <p className="mt-4 leading-relaxed text-gray-500 py-10">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
            quibusdam aperiam voluptatum.
          </p> */}
        </div>

      
        <SignUp path="/sign-up" />
      </div>
    </main>
  </div>
</section>
  
  );
}