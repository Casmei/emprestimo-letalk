import { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

import './App.css'

function App() {
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm({
    defaultValues: {
      'cpf': '12345678910',
      'birthDate': '10/20/1234',
      'value': 60000,
      'portionValue': 15000
    }
  });

  const [ loanTable, setLoanTable] = useState({
    debitBalance: [''],
    debitBalanceAdjusted: [''],
    installmentValue: [''],
    interestPerMonth: [''],
  });

  const [loan, setLoan] = useState({
    value: 0,
    month: 0,
    portionValue: 0,
    totalInterest: 0,
    totalLoan: 0,
    fee: 0
  })

  const [erro, setErro] = useState(undefined);

  let today= new Date();


  const onSubmit = async (data) => {
    data.value = parseFloat(data.value);
    data.portionValue = parseFloat(data.portionValue)
    try {
      const response = await axios.post(`http://localhost:3000/loan/simulation`, data);
      console.log(response.data.data);
      setLoan({... response.data.data })
      setLoanTable({... response.data.data});
      setErro(undefined);
    }catch(err){
      setErro(err.response.data.msg);
    }
  }

  const efetivar = async () => {
    const value = getValues();
    value.value = parseInt(value.value);
    value.portionValue = parseInt(value.portionValue);
    try {
      const response = await axios.post(`http://localhost:3000/loan`, value);
    }catch(err){
      console.log(err.response.data.message);
      erro = err.response.data.message
    }
  }


  return (
    <div className='font-letalk'>

        <div className='px-[19%] w-screen'>
          <form className='pt-16 pb-2 mx-auto text-center' onSubmit={handleSubmit(onSubmit)}>
            <div className='my-20'>
              <h1 className='text-center title-letalk'>
                Simule e solicite o seu empréstimo.
              </h1>
            </div>
            <div>
                <p className="text-center text-[20px] text-gray-700 font-bold mb-3  ">
                  Preencha o formulário abaixo para simular
                </p>
              <div className=" bg-[white] rounded-md shadow px-8">
                <div className='pt-16 pb-2 mx-auto text-center'>
                  <div className="mb-3">
                    <input type="text" {...register("cpf")} placeholder="CPF" className="px-3 p-3 mb-3.5 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-[1px] border-[#D4D4D4] outline-none focus:outline-none focus:ring w-full"/>
                  </div>

                  <div >
                    <select {...register("stateId")} id="countries" className="px-3 p-3 mb-3.5 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-[1px] border-[#D4D4D4] outline-none focus:outline-none focus:ring w-full">
                      <option className='text-slate-300 placeholder-slate-300' defaultValue><span className='text-slate-300'>Choose a country</span></option>
                      <option value="226def03-f494-4218-9d1a-171cef010451">Minas Gerais</option>
                      <option value="fa1b9558-f921-459d-a8af-c7a490037dd1">São Paulo</option>
                      <option value="3e935673-ec3c-48ab-ba3e-76fe561f32fd">Rio de Janeiro</option>
                      <option value="8c5ca9b6-47da-44e6-bc0e-af16632a8894">Espirito Santo</option>
                    </select>
                  </div>

                  <div className="mb-3 pt-0">
                    <input {...register("birthDate")} type="date" placeholder="DATA DE NASCIMENTO" className="px-3 p-3 mb-3.5 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-[1px] border-[#D4D4D4] outline-none focus:outline-none focus:ring w-full"/>
                  </div>

                  <div className="mb-3 pt-0">
                    <input {...register("value")} type="number" placeholder="QUAL O VALOR DO EMPRÉSTIMO" className="px-3 p-3 mb-3.5 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-[1px] border-[#D4D4D4] outline-none focus:outline-none focus:ring w-full"/>
                  </div>

                  <div className="mb-3 pt-0">
                    <input {...register("portionValue")} type="number" placeholder="QUAL VALOR DESEJA PAGAR POR MÊS?" className="px-3 p-3 mb-3.5 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-[1px] border-[#D4D4D4] outline-none focus:outline-none focus:ring w-full"/>
                  </div>

                  <button type='submit' className="bg-[#F3A826] mb-4 shadow hover:bg-[#F3A000] mx-auto w-full text-white font-bold py-2 rounded">
                    SIMULAR
                  </button>
                </div>
              </div>

              { erro != undefined &&
                <div class="p-4 mt-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                  <span class="font-medium">Erro!</span> {erro}
                </div>
              }
            </div>
          </form>
        </div>

          <div className='px-[19%] w-screen'>

            <div>
              <p className="text-center mt-20 text-[20px] text-gray-700 font-bold mb-3">
                Veja a simulação para o seu empréstimo antes de efetivar
              </p>
              <div className="bg-[white] rounded-md shadow px-8">

                <div className='pt-8 pb-2 grid text-center grid-cols-1 md:grid-cols-3 md:text-left gap-4'>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>VALOR REQUERIDO</p>
                    <p className='valueLoan text-[20px]'>R$ {loan.value}</p>
                  </div>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>TAXA DE JUROS</p>
                    <p className='valueLoan text-[20px]'>{(loan.fee) * 100}% ao mês</p>
                  </div>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>VALOR DA PARCELA</p>
                    <p className='valueLoan text-[20px]'>R$ {loan.portionValue}</p>
                  </div>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>TOTAL DE MESES PARA QUITAR</p>
                    <p className='valueLoan text-[20px]'>{loan.month} MESES</p>
                  </div>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>TOTAL DE JUROS</p>
                    <p className='valueLoan text-[20px]'>R$ {loan.totalInterest}</p>
                  </div>
                  <div className='flex flex-col content-center'>
                    <p className='infoLoan'>TOTAL A PAGAR</p>
                    <p className='valueLoan text-[20px]'>R$ {loan.totalLoan}</p>
                  </div>
                </div>

                <div>
                    <div>
                      <p className='infoLoan mt-20 mb-6'>PROJEÇÃO DAS PARCELAS</p>
                    </div>

                    <div className="bg-white">

                      <div className="overflow-x-auto ">
                        <table className="table-auto w-full">
                            <thead className="border-b border-dark">
                              <tr className="valueLoan">
                                  <th className="text-left p-4 ">
                                    SALDO DEVEDOR
                                  </th>
                                  <th className="text-left p-4">
                                    JUROS
                                  </th>
                                  <th className="text-left p-4">
                                    SALDO DEVEDOR AJUSTADO
                                  </th>
                                  <th className="text-left p-4">
                                    VALOR DA PARCELA
                                  </th>
                                  <th className="text-left p-4">
                                    VENCIMENTO
                                  </th>
                              </tr>
                            </thead>
                            <tbody>

                                {loanTable.debitBalance.map((item, index) => {
                                  today.setMonth(today.getMonth() + 1)
                                  return (
                                    <tr className="border-b hover:bg-gray-50">
                                      <td className="p-4">
                                        {item}
                                      </td><td className="p-4">
                                        R${loanTable.interestPerMonth[index]}
                                      </td><td className="p-4">
                                        R${loanTable.debitBalanceAdjusted[index]}
                                      </td><td className="p-4">
                                        R${loanTable.installmentValue[index]}
                                      </td><td className="p-4">
                                        R${today.toLocaleDateString('pt-BR') }
                                      </td>
                                    </tr>
                                  )
                                })}
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-4" colSpan={5}>
                                    0
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                    </div>
                    <button onClick={efetivar} className="bg-[#21AE1E] mt-10 mb-4 shadow hover:bg-[#21A02E] mx-auto w-full text-white font-bold py-2 rounded">
                      EFETIVAR O EMPRESTIMO
                    </button>
                </div>
              </div>
          </div>
        </div>

    </div>

  )
}

export default App
