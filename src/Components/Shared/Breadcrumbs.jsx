import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="text-sm font-medium text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {item.path ? (
                            <Link to={item.path} className="text-gray-600 hover:text-green-600 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;