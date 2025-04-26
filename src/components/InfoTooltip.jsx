import { IoInformationCircleOutline } from "react-icons/io5";

const InfoTooltip = () => {
  return (
    <div className="flex items-center">
      <p className="text-white text-center mb-6 mr-2">
        ¡Una manera equitativa de dividir las cuentas!
      </p>
      <div className="relative group">
        <IoInformationCircleOutline className="text-white text-2xl mb-6 cursor-pointer" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          ¡Divide gastos de manera justa entre amigos y familiares!
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
