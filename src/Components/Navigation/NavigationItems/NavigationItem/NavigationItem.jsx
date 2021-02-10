import React from 'react'

const NavigationItem = (props) => {
    const items = ['Genre', 'Country', 'TV', 'Anime']
    {return items.map((item, i) => (
        <li key={item+i}>{item}</li>
    ))}
}

export default NavigationItem
