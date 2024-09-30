const Pagination = ({
  count,
  setCount,
  selectedValue,
  setSelectedValue,
  totalCount = 0,
  pages,
  // totalCount
}) => {
  const options = Array.from({ length: 22 }, (_, index) => (
    <option key={index} value={index + 1}>
      {index + 1}
    </option>
  ));

  const handleSelectChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSelectedValue(newValue);
  };

  const onPrevious = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onNext = () => {
    if (count < pages) {
      setCount(count + 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let number = 1; number <= pages; number++) {
      if (
        number === 1 ||
        number === pages ||
        (number >= count - 1 && number <= count + 1)
      ) {
        buttons.push(
          <div
            key={number} // Add unique key prop here
            onClick={() => setCount(number)}
            className={`flex items-center justify-center p-[10px]  h-[40px] w-[40px] bg-[white] border border-[#E6E6E6] cursor-pointer border-l-0 ${
              count === number ? "bg-secondary" : ""
            }`}
          >
            {number}
          </div>
        );
      } else if (
        (number === count - 2 && count > 3) ||
        (number === count + 2 && count < pages - 2)
      ) {
        buttons.push(
          <div
            key={`dots-${number}`} // Add unique key prop here
            className="flex items-center justify-center p-[10px]  h-[40px] w-[40px] bg-[white] border border-[#E6E6E6] cursor-pointer border-l-0"
          >
            ...
          </div>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="ml-auto sm:m-0 flex flex-col-reverse sm:flex-row gap-5 justify-between p-2 items-center ">
      <div className="flex items-center text-[#6B7280] font-[500] text-[16px]">
        <p className="">Show </p>
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="flex items-center justify-between px-[5px] border border-[#DCDCDC] rounded-md mx-3 bg-[#f5f5f5] text-[#717171] outline-none p-1 cursor-pointer no-scrollbar"
        >
          {options}
        </select>

        <p className="text-[#717171] ">{` of  ${totalCount} entries`}</p>
      </div>

      <div className="flex items-center justify-center">
        <div
          onClick={onPrevious}
          className="flex items-center justify-center p-[10px]  h-[40px] w-[40px] bg-[white] border border-[#E6E6E6] cursor-pointer rounded-tl-[9px] rounded-bl-[9px] "
        >
          <img
            className={`transform rotate-180 ${
              count === 1 ? "opacity-40 " : ""
            }`}
            src="/icons/pagination-next.svg"
            alt=""
          />
        </div>
        {renderPaginationButtons()}
        <div
          onClick={onNext}
          className="flex items-center justify-center p-[10px]  h-[40px] w-[40px] bg-[white] border border-[#E6E6E6] cursor-pointer rounded-tr-[9px] rounded-br-[9px] border-l-0"
        >
          <img
            className={`cursor-pointer  ${
              count === pages ? "opacity-40 " : ""
            }`}
            src="/icons/pagination-next.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
