import { useState, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import { getPriceChange, getPriceRange, sliceListByPage } from "@/utils";

const horizontalHeaders = ["Open", "Close", "Change", "High", "Low", "Range"];

const changeCellBgColor = {
  "+": "bg-green-600",
  "-": "bg-red-600",
  "": "bg-slate-600",
} as const;

export default function TableView({ series }: { series: any }) {
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const descSeries = [...series].reverse();
  const { pageData, maxPageNo } = sliceListByPage({
    list: descSeries,
    pageSize: 20,
    pageNo: currentPageNo,
  });
  const hasVolume = !!descSeries[0].volume;

  return (
    <div className="mx-auto max-w-fit">
      <p className="mb-2 text-sm text-gray-600">
        Check the details of the base currency in the quote currency.
      </p>
      <table className="relative mb-2 block border-separate snap-x snap-proximity scroll-pl-24 overflow-y-scroll rounded text-right text-nowrap">
        <colgroup>
          <col span={1} className="border-r border-white bg-white" />
          <col span={3} className="border-x border-white bg-yellow-100/50" />
          <col span={2} className="border-x border-white bg-blue-100/50" />
          <col span={1} className="border-r-0 border-white bg-blue-100/50" />
          <col span={1} className="border-l border-white bg-green-100/50" />
        </colgroup>
        <thead className="border-b text-center text-sm">
          <tr>
            <th
              scope="col"
              className="sticky -left-0.5 bg-white pl-1 text-left"
            >
              <span className="inline-block w-24 py-1">Time</span>
            </th>
            {horizontalHeaders.map((h) => (
              <th key={h} scope="col" className="snap-start">
                {h}
              </th>
            ))}
            {hasVolume && (
              <th scope="col" className="snap-start">
                Volume
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-right">
          {pageData.map((data) => (
            <TableRow key={data.time} rowData={data} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPageNo={currentPageNo}
        maxPageNo={maxPageNo}
        setCurrentPageNo={setCurrentPageNo}
      />
      <Notes />
    </div>
  );
}

function TableRow({ rowData }: { rowData: any }) {
  const range = getPriceRange(rowData.high, rowData.low);
  const [sign, priceChange] = getPriceChange(rowData.close, rowData.prevClose);
  const cellBgColor = changeCellBgColor[sign];

  return (
    <tr className="snap-start hover:bg-blue-100">
      <th
        scope="row"
        className="sticky -left-0.5 bg-white py-1 pr-3 pl-1 text-left text-sm"
      >
        {rowData.time}
      </th>
      <td className="snap-start px-4">{rowData.open}</td>
      <td className="px-4">{rowData.close}</td>
      <td
        className={clsx(cellBgColor, "px-4 text-white")}
      >{`${sign}${priceChange}`}</td>
      <td className="px-4">{rowData.high}</td>
      <td className="px-4">{rowData.low}</td>
      <td className="px-4">{range}</td>
      {rowData.volume && <td className="px-4">{rowData.volume}</td>}
    </tr>
  );
}

function Pagination({
  currentPageNo,
  maxPageNo,
  setCurrentPageNo,
}: {
  currentPageNo: number;
  maxPageNo: number;
  setCurrentPageNo: Dispatch<SetStateAction<number>>;
}) {
  const isPrevButtonDisabled = currentPageNo === 1;
  const isNextButtonDisabled = currentPageNo === maxPageNo;
  const handlePrevButtonClick = () =>
    setCurrentPageNo(Math.max(1, currentPageNo - 1));
  const handleNextButtonClick = () =>
    setCurrentPageNo(Math.min(currentPageNo + 1, maxPageNo));

  return (
    <nav aria-label="table pagination" className="mx-auto mb-2 w-fit text-lg">
      <button
        disabled={isPrevButtonDisabled}
        aria-label="go to previous page"
        onClick={handlePrevButtonClick}
        className="w-8 text-blue-600 disabled:text-gray-400"
      >
        &#10094;
      </button>
      <span className="px-3">
        <span aria-label="current page number">{currentPageNo}</span> &#8260;{" "}
        <span aria-label="max page number">{maxPageNo}</span>
      </span>
      <button
        disabled={isNextButtonDisabled}
        aria-label="go to next page"
        onClick={handleNextButtonClick}
        className="w-8 text-blue-600 disabled:text-gray-400"
      >
        &#10095;
      </button>
    </nav>
  );
}

function Notes() {
  return (
    <div
      aria-label="notes"
      className="rounded-lg border-4 border-double border-sky-50 bg-sky-200 p-2 text-xs leading-tight tracking-tight"
    >
      <ul className="mx-auto w-11/12 list-disc">
        <li>
          Change (%): (close price - previous close price) / previous close
          price
        </li>
        <li>Range (%): (high price - low price) / low price</li>
        <li>
          All data except currency changes and ranges is powered by{" "}
          <a
            href="https://www.alphavantage.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Alpha Vantage
          </a>{" "}
          API.
        </li>
      </ul>
    </div>
  );
}
