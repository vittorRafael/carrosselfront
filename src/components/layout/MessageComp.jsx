/* eslint-disable react/prop-types */

const MessageComp = ({ msg }) => {
  return (
    <div
      className={`msg-width fixed text-center z-50 top-5  p-4 mb-4 text-sm rounded-lg ${
        msg.error ? 'text-red-800 bg-red-50' : 'text-green-800 bg-green-50'
      }`}
      role="alert"
    >
      <span className="font-medium">{msg.text}</span>
    </div>
  );
};

export default MessageComp;
