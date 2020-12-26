import React from 'react'

export function Product({data}){
    return (
        <div>
            <div>{data.name}]</div>
            <div>{data.description}</div>
        </div>
    )
}