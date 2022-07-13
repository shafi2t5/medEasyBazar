import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface dropdown {
  stateDropdown: any;
  setStateDropdown?: any;
  dList: any;
  name?: string;
  className?: string;
}

export default function Dropdowns({
  stateDropdown,
  setStateDropdown,
  dList,
  name = 'Piece',
  className = 'font-bold py-4',
}: dropdown) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full mt-3">
      <div className="">
        <Menu.Button
          className={`inline-flex justify-center w-full rounded-md border bg-brand-sidebarColor ${className}`}
        >
          <span className={`flex-1 text-md text-brand-dark`}>
            {stateDropdown ? `${stateDropdown}` : name}
          </span>
          <svg
            className="mr-1 ml-2 h-6 w-6 text-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right z-50 w-full absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {dList?.map((data: any, index: number) => (
              <Menu.Item key={index}>
                {({ active }: any) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => setStateDropdown(data?.unit)}
                  >
                    {data?.unit}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
