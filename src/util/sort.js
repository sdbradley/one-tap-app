import React from 'react';
import Icon from 'components/icon';

export function byNumber(a, b, asc = true) {
    a = a === null ? -1 : a;
    b = b === null ? -1 : b;
    return asc ? a - b : b - a;
}

export function byString(a, b, asc = true, ignoreCase = true) {
    if(ignoreCase) {
        a = a != null ? a.toUpperCase() : '';
        b = b != null ? b.toUpperCase() : '';
    } else {
        a = a || '';
        b = b || '';
    }
    if((a > b) === asc) {
        return 1;
    }
    if((a < b) === asc) {
        return -1;
    }
}

export function byName(a, b, asc = true) {
    let nameA = (a && (`${a.lastName}, ${a.firstName}`)) || '';
    let nameB = (b && (`${b.lastName}, ${b.firstName}`)) || '';
    return byString(nameA, nameB, asc);
}

export function handleSort(parent, sortTypeCompare = '', ascByDefault = true) {
    if( parent.state.sortType === sortTypeCompare || sortTypeCompare.length === 0) {
        parent.setState({ascending: !parent.state.ascending});
    }
    else {
        parent.setState({ascending: ascByDefault, sortType: sortTypeCompare});
    }
}

export function renderIcon(ascending, handler, className = '') {
    return <Icon type='sort' className={className} ascending={ascending} onClick={handler}/>;
}
