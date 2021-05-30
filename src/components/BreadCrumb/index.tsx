import React from 'react';
import {
    HomeIcon
  } from '../../icons'

type PageHeaderProps = {
    data: any[];
    title: string;
};

const index: React.FC<PageHeaderProps> = ({ data, title }) => {
    return (
        <div style={{ width: "100%"}} className=" divide-y bg-white divide-fuchsia-300 shadow-sm">
            <div className="px-2 ">
               <nav className="text-teal-700 p-3 rounded font-sans w-full mx-2">               
                    <ol className="list-reset flex text-grey-dark">
                        <HomeIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        {
                            data.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href="/" className="text-teal-700 dark:text-gray-400 text-sm">{item}</a>
                                        <span className="mx-2 text-sm">/</span>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>
            </div>
            <div className="px-3 ">
               <h1 className="p-3 text-teal-700 mb-5 dark:text-gray-400" style={{fontSize:20}}>{title}</h1>
            </div>
        </div>
    )
}

export default index

