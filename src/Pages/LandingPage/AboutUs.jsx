import React from 'react';

export default function CallAction() {
  return (
    <div className="relative py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>
      <div className="relative">
        <div className="flex items-center justify-center -space-x-2">
          <img
            loading="lazy"
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
            alt="member photo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width={200}
            height={200}
            src="https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
            alt="member photo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width={200}
            height={200}
            src="https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
            alt="member photo"
            className="z-10 h-16 w-16 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width={200}
            height={200}
            src="https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
            alt="member photo"
            className="relative h-12 w-12 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width={200}
            height={200}
            src="https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
            alt="member photo"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
        <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
            About us
          </h1>
          <p className="text-center text-xl text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            aliquid eos, quae, dicta expedita voluptates magnam deleniti unde
            sit, repellendus quam voluptate delectus vel pariatur ipsum nesciunt
            sunt provident quibusdam!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span className="relative text-base font-semibold text-center text-primary dark:text-white">
                More about
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
