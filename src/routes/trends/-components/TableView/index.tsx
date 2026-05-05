import { useState, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import { getPriceChange, getPriceRange, sliceListByPage } from "@/utils";

const horizontalHeaders = ["Open", "Close", "Change", "High", "Low", "Range"];

const changeCellBgColor = {
  "+": "bg-emerald-600",
  "-": "bg-rose-600",
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
    <div aria-label="table view" className="mx-auto max-w-fit">
      <p className="mb-2 text-sm text-slate-600 md:mb-4 md:text-lg lg:mb-6 lg:text-2xl xl:mb-10 xl:text-2xl">
        Check the exchange rate trends of the base currency against the quote
        currency using multiple indicators.
      </p>
      <table className="relative mx-0 mb-2 block border-separate snap-x snap-proximity scroll-pl-24 overflow-y-auto rounded text-right text-sm text-nowrap text-slate-900 md:mb-4 md:text-lg lg:mb-8 lg:text-2xl">
        <colgroup>
          <col span={1} className="border-r border-white bg-white" />
          <col span={3} className="border-x border-white bg-yellow-100/50" />
          <col span={2} className="border-x border-white bg-blue-100/50" />
          <col span={1} className="border-r-0 border-white bg-blue-100/50" />
          <col span={1} className="border-l border-white bg-green-100/50" />
        </colgroup>
        <thead className="border-b text-center">
          <tr>
            <th
              scope="col"
              className="sticky -left-0.5 bg-white pl-1 text-left lg:text-center"
            >
              <span className="inline-block w-24 py-1 lg:py-2">Time</span>
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
        className="sticky -left-0.5 bg-white py-1 pr-3 pl-1 text-left lg:px-8 lg:py-2 xl:py-4"
      >
        {rowData.time}
      </th>
      <td className="snap-start px-4 font-mono md:px-6 lg:px-8">
        {rowData.open}
      </td>
      <td className="px-4 font-mono md:px-6 lg:px-8">{rowData.close}</td>
      <td
        className={clsx(
          cellBgColor,
          "px-4 font-mono text-white md:px-6 lg:px-8",
        )}
      >{`${sign}${priceChange}`}</td>
      <td className="px-4 font-mono md:px-6 lg:px-8">{rowData.high}</td>
      <td className="px-4 font-mono md:px-6 lg:px-8">{rowData.low}</td>
      <td className="px-4 font-mono md:px-6 lg:px-8">{range}</td>
      {rowData.volume && (
        <td className="px-4 font-mono md:px-6 lg:px-8">{rowData.volume}</td>
      )}
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
    <nav
      aria-label="table pagination"
      className="mx-auto mb-2 w-fit text-lg md:mb-4 md:text-2xl lg:text-3xl xl:mb-8 xl:text-4xl"
    >
      <button
        disabled={isPrevButtonDisabled}
        aria-label="go to previous page"
        onClick={handlePrevButtonClick}
        className="w-8 text-blue-600 disabled:text-slate-400 md:w-12 lg:w-14 xl:w-16"
      >
        &#10094;
      </button>
      <span className="px-3 text-slate-900 md:px-6 lg:px-8 xl:px-10">
        <span aria-label="current page number">{currentPageNo}</span> &#8260;{" "}
        <span aria-label="max page number">{maxPageNo}</span>
      </span>
      <button
        disabled={isNextButtonDisabled}
        aria-label="go to next page"
        onClick={handleNextButtonClick}
        className="w-8 text-blue-600 disabled:text-slate-400 md:w-12 lg:w-14 xl:w-16"
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
      className="rounded-lg border-4 border-double border-sky-50 bg-sky-200 p-2 text-xs leading-tight tracking-tight text-slate-900 md:mb-8 md:rounded-xl md:border-6 md:p-2 md:text-lg md:leading-8 lg:mb-10 lg:border-6 lg:text-2xl lg:leading-relaxed xl:mx-auto xl:border-8"
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
