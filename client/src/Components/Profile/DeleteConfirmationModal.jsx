import React from "react";

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {

    return isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className=" pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-60"></div>
                </div>

                {/* Modal */}
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/* Exclamation icon */}
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856a2 2 0 002-2V7a2 2 0 00-2-2H5.063a2 2 0 00-2 2v9a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Delete you account
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={() => {
                                onDelete();
                                onClose();
                            }}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Delete
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default DeleteConfirmationModal;
