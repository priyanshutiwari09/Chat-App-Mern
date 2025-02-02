const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed p-5 inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-96 text-left text-black rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmLogoutModal;
  