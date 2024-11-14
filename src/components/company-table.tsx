import clsx from 'clsx'

import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import { RootState } from '../store/store'
import { useDispatch, useSelector } from "react-redux"
import {
    addCompany,
    removeSelectedCompanies,
    toggleSelectCompany,
    toggleSelectAll,
    editCompany,
    sortCompanies,
    addCompanies,
} from '../store/companies-slice'

import { Input } from './input'
import { Button } from './button'
import { Switch } from './switch'
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'

function generateAlphabeticLabel(index: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let label = ''
    let i = index

    while (i >= 0) {
        label = alphabet[i % 26] + label
        i = Math.floor(i / 26) - 1
    }

    return label
}

export const CompanyTable = () => {
    const dispatch = useDispatch()

    // const { companies, loading, page } = useSelector((state: RootState) => state.companies)

    const companies = useSelector((state: RootState) => state.companies.companies)
    const sortBy = useSelector((state: RootState) => state.companies.sortBy)
    const sortDirection = useSelector((state: RootState) => state.companies.sortDirection)

    const [newCompany, setNewCompany] = useState({ name: '', address: '' })
    const [generationIsOn, setGenerationIsOn] = useState<boolean>(false)


    const parentRef = useRef<HTMLDivElement>(null)

    const loadMoreCompanies = () => {
        const fakeCompanies = Array.from({ length: 10 }, (_, index) => ({
            id: `${Date.now()}_${index + 1}`,
            name: `Company ${generateAlphabeticLabel(index)}`,
            address: `Address ${generateAlphabeticLabel(index)}`,
            selected: false,
        }))

        dispatch(addCompanies(fakeCompanies))
    }

    // useEffect(() => {
    //     dispatch(fetchCompanies(page))
    // }, [dispatch, page])

    // useEffect(() => {
    //     loadMoreCompanies()
    // }, [])

    const rowVirtualizer = useVirtualizer({
        count: companies.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 5,
    })

    // useEffect(() => {
    //     const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    //     if (lastItem && lastItem.index >= companies.length - 1 && !loading) {
    //         dispatch(fetchCompanies(page + 1))
    //     }
    // }, [rowVirtualizer.getVirtualItems(), companies.length, loading, dispatch, page])

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        if (!lastItem) return

        if (lastItem.index >= companies.length - 1 && generationIsOn) {
            loadMoreCompanies()
        }
    }, [rowVirtualizer.getVirtualItems()])

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
        dispatch(sortCompanies(field))
    }

    const handleGenerationSwitch = () => {
        if (!generationIsOn) {
            setGenerationIsOn(true)
            loadMoreCompanies()
        } else {
            setGenerationIsOn(false)
        }
    }

    return (
        <div className="space-y-8 mt-8 lg:mt-20 px-4 lg:px-60">
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-4">
                <Button
                    variant='delete'
                    onClick={() => dispatch(removeSelectedCompanies())}
                >
                    Удалить выбранное
                </Button>
                <div className='flex flex-col lg:flex-row gap-4'>
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
                <div className='flex justify-between items-center gap-x-4'>
                    <h3 className='text-sm text-neutral-500'>Всего компаний: {companies.length.toLocaleString('ru-RU')}</h3>
                    <div className='flex justify-between items-center gap-x-2'>
                        <Switch id='generation-switch' onClick={handleGenerationSwitch} />
                        <label htmlFor="generation-switch" className='hidden lg:block text-sm text-neutral-500 select-none'>Генерация {generationIsOn ? 'on' : 'off'}</label>
                    </div>
                </div>
                <div className='overflow-auto h-[319px] lg:h-[637px]' ref={parentRef}>
                    <div className='border border-gray-500 rounded-md overflow-hidden'>
                        <table className="w-full text-left text-white">
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

                                {companies.map((company, index) => (
                                    <tr
                                        key={company.id}
                                        className={clsx('border-y border-gray-500 transition-colors',
                                            company.selected && 'border-blue-500 bg-blue-500/10',
                                            index === companies.length - 1 && 'border-b-transparent'
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
            </div>
        </div>
    )
}