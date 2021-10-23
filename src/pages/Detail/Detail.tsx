import { BsInfoCircle, BsQuestionCircle, BsArrowRightShort } from "react-icons/bs";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import { DCAPosition, PositionTx } from "../../types";
import { WEB3_DATA_TYPE } from "../../constants/web3";
import { formatDateHumanize, getEtherscanUrl } from "../../utils/misc";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import ModalClaim from "./components/ModalClaim/ModalClaim";
import ModalDeposit from "./components/ModalDeposit/ModalDeposit";
import ModalExit from "./components/ModalExit/ModalExit";
import ModalWIthdraw from "./components/ModalWithdraw/ModalWithdraw";
import Button from "../../components/Button/Button";
import { tokenIns, tokenOuts } from "../../constants/tokens";

interface DetailParams {
  positionId: string
}

const Detail = () => {
  let { positionId } = useParams<DetailParams>();

  const [isOpenModalExit, setIsOpenModalExit] = useState<boolean>(false);
  const [isOpenModalWithdraw, setIsOpenModalWithdraw] = useState<boolean>(false);
  const [isOpenModalClaim, setIsOpenModalClaim] = useState<boolean>(false);
  const [isOpenModalDeposit, setIsOpenModalDeposit] = useState<boolean>(false);

  const position: DCAPosition = {
    id: positionId,
    tokenIn: tokenIns[0],
    tokenOut: tokenOuts[0],
    balanceIn: "0.5",
    balanceOut: "1000",
    amountDCA: "100",
    intervalDCA: "86400",
    lastDCA: "0",
    maxSlippage: "10"
  };

  const transactions: PositionTx[] = [
    {
      action: "DCA 0.1 ETH with 100 USDC",
      timestamp: "2 minutes ago",
      txHash: "0xc4036389f...7d30"
    },
    {
      action: "DCA 0.1 ETH with 100 USDC",
      timestamp: "12 minutes ago",
      txHash: "0xc4036389f...6d54"
    },
    {
      action: "Claim 0.5 ETH",
      timestamp: "4 hours ago",
      txHash: "0xc4036389f...422c"
    },
    {
      action: "Add 500 USDC",
      timestamp: "5 hours ago",
      txHash: "0xc4036389f...420c"
    },
    {
      action: "Open position with 1,000 USDC",
      timestamp: "2 days ago",
      txHash: "0xc4036389f...7d30"
    },
  ];

  const interval = useMemo(() => {
    return `every ${formatDateHumanize(parseInt(position.intervalDCA))}`
  }, [formatDateHumanize, position]);

  const numOfDca = useMemo(() => {
    return BigNumber.from(position.balanceOut).div(BigNumber.from(position.amountDCA)).toString();
  }, [formatDateHumanize, position]);

  return (
    <div className="w-full flex">
        <div className="w-full sm:w-3/4 lg:w-2/3 mt-28 mx-auto">
          <ButtonBack label="Back to Positions overview" />
          <div className="my-2 flex">
            <div className="py-3 px-1 font-bold text-2xl">
              <img src={position.tokenOut.imageUri} className="h-7 pb-1 pr-1 inline"/>{position.tokenOut.symbol}
              <BsArrowRightShort className="inline pb-1 mx-1" size="28px"/> 
              <img src={position.tokenIn.imageUri} className="h-7 pb-1 pr-1 inline"/>{position.tokenIn.symbol}
            </div>
            {/* TODO: CREATE COMPONENT IF NEEDED */}
            <button className="hover:bg-red-300 border-2 border-red-400 rounded-lg px-3 py-1 my-2 mr-2 font-mono text-red-500 ml-auto"
              onClick={() => setIsOpenModalExit(true)}>
              Exit Position
            </button>
            <Button label="Add Fund" onClick={() => setIsOpenModalDeposit(true)} 
              isPrimary isMono fullWidth={false} padding="px-8 py-1 my-2"/>
          </div>
          <div className="grid grid-cols-7 gap-3 font-mono">
            <div className="bg-white rounded-lg p-4 col-span-4">
              <div className="grid grid-cols-2">
                <div>
                  <div className="mb-4">
                    <div className="text-md text-gray-500">DCA interval<BsQuestionCircle className="inline pl-1 pb-1" size="18px"/></div>
                    <div className="text-lg">
                      {interval}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-md text-gray-500">DCA amount<BsQuestionCircle className="inline pl-1 pb-1" size="18px"/></div>
                    <div className="text-lg">{position.amountDCA} {position.tokenOut.symbol}</div>
                  </div>
                  <div>
                    <div className="text-md text-gray-500">DCA left</div>
                    <div className="text-lg">{numOfDca} times<BsInfoCircle className="inline pl-1 pb-1" size="16px"/></div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="text-md text-gray-500">Total spent</div>
                    <div className="text-lg">350 USDC</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-md text-gray-500">Total bought</div>
                    <div className="text-lg">0.6 ETH</div>
                  </div>
                  <div>
                    <div className="text-md text-gray-500">Next DCA in</div>
                    <div className="text-lg">12:00:10</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="bg-white rounded-lg p-4">
                <div className="text-lg">Available Funds</div>
                <div className="mt-3 flex justify-between">
                  <span className="text-2xl font-bold">{position.balanceOut} {position.tokenOut.symbol}</span>
                  <Button label="Withdraw" onClick={() => setIsOpenModalWithdraw(true)} 
                    isPrimary={false} isMono fullWidth={false} padding="px-3 py-1"/>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mt-3">
                <div className="text-lg">Claimable</div>
                <div className="mt-3 flex justify-between">
                  <span className="text-2xl font-bold">{position.balanceIn} {position.tokenIn.symbol}</span>
                  <Button label="Claim" onClick={() => setIsOpenModalClaim(true)} 
                    isPrimary={false} isMono fullWidth={false} padding="px-3 py-1"/>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mt-3 font-mono">
            <div className="text-lg">History</div>
            <table className="table-auto w-full mt-3">
              <thead>
                <tr>
                  <th className="text-left">Action</th>
                  <th className="text-right">Time</th>
                  <th className="text-right">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  return (
                    <tr key={tx.txHash}>
                      <td>{tx.action}</td>
                      <td className="text-right">{tx.timestamp}</td>
                      <td className="text-right">
                        <a href={getEtherscanUrl(tx.txHash, WEB3_DATA_TYPE.Tx)} className="underline" target="_blank" rel="noreferrer">
                          {tx.txHash}↗
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ModalExit isOpen={isOpenModalExit} onDismiss={() => setIsOpenModalExit(false)} onSubmit={() => {}} 
          tokenIn={position.tokenIn} 
          tokenOut={position.tokenOut} 
          amountIn={position.balanceIn} 
          amountOut={position.balanceOut}/>
        <ModalDeposit isOpen={isOpenModalDeposit} onDismiss={() => setIsOpenModalDeposit(false)} onSubmit={() => {}} 
          maxAmount={"10000"} token={position.tokenOut}/>
        <ModalWIthdraw isOpen={isOpenModalWithdraw} onDismiss={() => setIsOpenModalWithdraw(false)} onSubmit={() => {}} 
          maxAmount={position.balanceIn} token={position.tokenOut}/>
        <ModalClaim isOpen={isOpenModalClaim} onDismiss={() => setIsOpenModalClaim(false)} onSubmit={() => {}}
          amount="0.1"
          token={position.tokenIn}/>
    </div>  
  );
};

export default Detail;