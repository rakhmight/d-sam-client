import { FC, useEffect } from 'react'
import ListItem from './list-item/ListItem'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Empty from '@/components/structures/empty/Empty'
  
const ListTable : FC = () => {
    const { currentData } = useSelector((state:RootState)=>state)

    useEffect(() => {
        console.log(currentData)
        
    }, [currentData])
    
    return(
        <div className='bg-slate-200 min-h-[60vh] max-h-[60vh] rounded-b overflow-y-auto overflow-x-hidden drop-shadow-sm'>
            {
                !currentData.files.length ? (
                    <Empty />
                ) : (
                    <>
                        {
                            currentData.lists.length ? (
                                <>
                                    {
                                        currentData.lists.map(list => (
                                            <ListItem key={list.id} name={list.name} id={list.id} />
                                        ))
                                    }
                                </>
                            ) : (
                                <Empty />
                            )
                        }
                    </>
                )
            }


        </div>
    )
}

export default ListTable