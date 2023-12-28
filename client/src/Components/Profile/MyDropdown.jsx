import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MoreVertical, LogOut, Settings } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../Context'
import SettingsModal from '../Profile/Settings'
import { auth } from '../Auth/firbase';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function MyDropdown() {

    const { isOpen, setIsOpen } = useContext(Context);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await auth.signOut();
            localStorage.clear();
            navigate('/login')
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }

    }
    const openSettingsModel = () => {
        setIsOpen(true);
    };
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-indigo-400 hover:text-indigo-900">
                        <MoreVertical className="h-5 w-5" aria-hidden="true" />
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
                    <Menu.Items className="absolute left-8 z-10 -mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={openSettingsModel}
                                        className={classNames(
                                            active ? 'bg-indigo-100 text-gray-900' : 'text-gray-700',
                                            'flex gap-2 items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <Settings size={16} />
                                        <span>Settings</span>

                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        onClick={logOut}
                                        className={classNames(
                                            active ? 'bg-indigo-100 text-gray-900' : 'text-gray-700',
                                            'px-4 py-2 text-sm flex gap-2 items-center'
                                        )}
                                    >
                                        <LogOut size={16} />
                                        <span>Log out</span>
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <SettingsModal />
        </>
    )
}
