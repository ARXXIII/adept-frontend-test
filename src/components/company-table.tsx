import { useState } from 'react'

import { RootState } from '../store/store'
import { useDispatch, useSelector } from "react-redux"
import {
    addCompany,
    removeSelectedCompanies,
    toggleSelectCompany,
    toggleSelectAll,
    editCompany,
} from '../store/companies-slice'
import { Button } from './button'
import clsx from 'clsx'

export const CompanyTable = () => {
    const dispatch = useDispatch()
    const companies = useSelector((state: RootState) => state.companies.companies)
    const [newCompany, setNewCompany] = useState({ name: '', address: '' })

    const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleSelectAll(e.target.checked))
    }

    const handleEditCompany = (id: string, field: keyof typeof newCompany, value: string) => {
        dispatch(editCompany({
            id, [field]: value, selected: false,
            name: '',
            address: ''
        }))
    }

    const handleAddCompany = () => {
        if (newCompany.name && newCompany.address) {
            dispatch(addCompany(newCompany))
            setNewCompany({ name: '', address: '' })
        }
    }

    return (
        <div className="space-y-8 mt-20 px-4 lg:px-60">
            <div className="flex justify-between gap-x-4">
                <Button
                    variant='delete'
                    onClick={() => dispatch(removeSelectedCompanies())}
                >
                    Удалить выделенные
                </Button>
                <div className='flex gap-x-4'>
                    <input
                        type="text"
                        placeholder="Название"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        className="p-2 lg:min-w-96 text-sm border rounded-xl"
                    />
                    <input
                        type="text"
                        placeholder="Адрес"
                        value={newCompany.address}
                        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                        className="p-2 lg:min-w-96 text-sm border rounded-xl"
                    />
                    <Button
                        variant='add'
                        onClick={handleAddCompany}
                    >
                        Добавить компанию
                    </Button>
                </div>
            </div>
            <table className="w-full text-left border">
                <thead>
                    <tr>
                        <th className="p-2">
                            <input type="checkbox" onChange={handleToggleSelectAll} />
                        </th>
                        <th className="p-2">Название</th>
                        <th className="p-2">Адрес</th>
                    </tr>
                </thead>
                <tbody>

                    {companies.map((company) => (
                        <tr
                            key={company.id}
                            className={clsx('border transition-colors',
                                company.selected && 'bg-blue-100'
                            )}
                        >
                            <td className='p-2'>
                                <input
                                    type="checkbox"
                                    checked={company.selected}
                                    onChange={() => dispatch(toggleSelectCompany(company.id))}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={company.name}
                                    onChange={(e) => handleEditCompany(company.id, 'name', e.target.value)}
                                    className="p-2 w-full bg-transparent"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={company.address}
                                    onChange={(e) => handleEditCompany(company.id, 'address', e.target.value)}
                                    className="p-2 w-full bg-transparent"
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}