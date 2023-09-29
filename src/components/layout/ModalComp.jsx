/* eslint-disable react/prop-types */
const ModalComp = ({
  titleModal,
  label,
  inputName,
  value,
  handleChange,
  handleModal,
  handleSubmit,
  idCarrossel,
  labelButton,
  corButton,
}) => {
  return (
    <>
      <div className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:gap-10">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{titleModal}</h3>
            </div>
            <div className="relative py-6 px-10 lg:px-20">
              <div className="flex flex-col gap-3">
                <label htmlFor={inputName} className="font-medium text-lg">
                  {label}
                </label>
                <input
                  className="p-2 border-2"
                  type="text"
                  name={inputName}
                  id={inputName}
                  value={value || ''}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleModal(false)}
              >
                Fechar
              </button>
              <button
                className={`bg-${corButton}-500 text-white active:bg-${corButton}-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={() => handleSubmit(idCarrossel || '')}
              >
                {labelButton}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
    </>
  );
};

export default ModalComp;
