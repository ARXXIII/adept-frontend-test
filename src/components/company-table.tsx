import clsx from 'clsx'

import { useState } from 'react'

import { RootState } from '../store/store'
import { useDispatch, useSelector } from "react-redux"
import {
    addCompany,
    removeSelectedCompanies,
    toggleSelectCompany,
    toggleSelectAll,
    editCompany,
    sortCompanies,
} from '../store/companies-slice'

import { Input } from './input'
import { Button } from './button'
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'

export const CompanyTable = () => {
    const dispatch = useDispatch()
    const companies = useSelector((state: RootState) => state.companies.companies)
    const sortBy = useSelector((state: RootState) => state.companies.sortBy)
    const sortDirection = useSelector((state: RootState) => state.companies.sortDirection)
    const [newCompany, setNewCompany] = useState({ name: '', address: '' })

    const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleSelectAll(e.target.checked))
    }

    const handleEditCompany = (id: string, field: 'name' | 'address', value: string) => {
        const updatedCompany = companies.find((company) => company.id === id)

        if (updatedCompany) {
            dispatch(editCompany({ ...updatedCompany, [field]: value }))
        }
    }

    const handleAddCompany = () => {
        if (newCompany.name && newCompany.address) {
            dispatch(addCompany(newCompany))
            setNewCompany({ name: '', address: '' })
        }
    }

    const handleSort = (field: 'name' | 'address') => {
        dispatch(sortCompanies(field));
    }

    return (
        <div className="space-y-8 mt-20 px-4 lg:px-60">
            <div className="flex justify-between gap-x-4">
                <Button
                    variant='delete'
                    onClick={() => dispatch(removeSelectedCompanies())}
                >
                    Удалить выбранное
                </Button>
                <div className='flex gap-x-4'>
                    <Input
                        placeholder="Название"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        className='lg:min-w-96'
                    />
                    <Input
                        placeholder="Адрес"
                        value={newCompany.address}
                        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                        className='lg:min-w-96'
                    />
                    <Button
                        variant='add'
                        onClick={handleAddCompany}
                    >
                        Добавить компанию
                    </Button>
                </div>
            </div>
            <div className='space-y-4'>
                <h3 className='text-sm text-gray-500'>Всего строк: {companies.length.toLocaleString('ru-RU')}</h3>
                <table className="w-full text-left text-white border border-gray-500">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">
                                <input type="checkbox" id='select-all' onChange={handleToggleSelectAll} />
                            </th>
                            <th className='py-2' onClick={() => handleSort('name')}>
                                <Button
                                    type='button'
                                    className='flex items-center gap-x-2 font-black text-base'>
                                    Название
                                    {sortBy === 'name' && (sortDirection === 'asc' ? <FaSortAlphaUp className="size-5" /> : <FaSortAlphaDown className="size-5" />)}
                                </Button>
                            </th>
                            <th className='py-2' onClick={() => handleSort('address')}>
                                <Button
                                    type='button'
                                    className='flex items-center gap-x-2 font-black text-base'>
                                    Адрес
                                    {sortBy === 'address' && (sortDirection === 'asc' ? <FaSortAlphaUp className="size-5" /> : <FaSortAlphaDown className="size-5" />)}
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {companies.map((company) => (
                            <tr
                                key={company.id}
                                className={clsx('border border-gray-500 transition-colors',
                                    company.selected && 'border-blue-500 bg-blue-500/10'
                                )}
                            >
                                <td className='px-4 py-2'>
                                    <input
                                        type="checkbox"
                                        checked={company.selected}
                                        onChange={() => dispatch(toggleSelectCompany(company.id))}
                                    />
                                </td>
                                <td className='py-2'>
                                    <Input
                                        value={company.name}
                                        onChange={(e) => handleEditCompany(company.id, 'name', e.target.value)}
                                        className='border-none bg-transparent'
                                    />
                                </td>
                                <td className='py-2'>
                                    <Input
                                        value={company.address}
                                        onChange={(e) => handleEditCompany(company.id, 'address', e.target.value)}
                                        className='border-none bg-transparent'
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}