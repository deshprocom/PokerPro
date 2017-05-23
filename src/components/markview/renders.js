/* @flow */

import React from 'react'

import {
    Image,
    Text,
    View,
} from 'react-native'

import {
    Cell,
    Grid,
    Row,
} from 'react-native-tabular-grid'

import type {
    EmptyNode,
    HeadingNode,
    ImageNode,
    InlineContentNode,
    LinkNode,
    ListNode,
    TableNode,
    OutputFunction,
    RenderState,
    RenderStyles,
} from './types'
import ImageMark from '../simple/ImageMark'


const blockWrapStyle = Object.freeze({
    lineHeight: 0,
    includeFontPadding: false,
})

function renderTextBlock(styleName, styleName2) {
    return (node: InlineContentNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <Text key={state.key}>
            <Text style={blockWrapStyle}>{'\n'}</Text>
            <Text style={styleName2 ? [styles[styleName], styles[styleName2]] : styles[styleName]}>
                {typeof node.content === 'string' ? node.content : output(node.content, state)}
            </Text>
            <Text style={blockWrapStyle}>{'\n'}</Text>
        </Text>
    )
}

function renderTextContent(styleName) {
    return (node: InlineContentNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <Text key={state.key} style={styles[styleName]}>
            {typeof node.content === 'string' ? node.content : output(node.content, state)}
        </Text>
    )
}

function renderTableCell(cell, row, column, rowCount, columnCount, output, state, styles) {
    const cellStyle = [styles.tableCell]
    const contentStyle = [styles.tableCellContent]

    if (row % 2 == 0) {
        cellStyle.push(styles.tableCellEvenRow)
        contentStyle.push(styles.tableCellContentEvenRow)
    } else {
        cellStyle.push(styles.tableCellOddRow)
        contentStyle.push(styles.tableCellContentOddRow)
    }

    if (column % 2 == 0) {
        cellStyle.push(styles.tableCellEvenColumn)
        contentStyle.push(styles.tableCellContentEvenColumn)
    } else {
        cellStyle.push(styles.tableCellOddColumn)
        contentStyle.push(styles.tableCellContentOddColumn)
    }

    if (row == 1) {
        cellStyle.push(styles.tableHeaderCell)
        contentStyle.push(styles.tableHeaderCellContent)
    } else if (row == rowCount) {
        cellStyle.push(styles.tableCellLastRow)
        contentStyle.push(styles.tableCellContentLastRow)
    }

    if (column == columnCount) {
        cellStyle.push(styles.tableCellLastColumn)
        contentStyle.push(styles.tableCellContentLastColumn)
    }

    return <Cell rowId={row} id={column} key={column} style={cellStyle}>
        <Text style={contentStyle}>
            {output(cell, state)}
        </Text>
    </Cell>
}

function paddedSize(size, style) {
    function either(a, b) {
        return a === undefined ? b : a
    }

    const {
        padding = 0,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
    } = style

    return {
        width: size.width + either(paddingLeft, padding) + either(paddingRight, padding),
        height: size.height + either(paddingTop, padding) + either(paddingBottom, padding)
    }
}

export default Object.freeze({
    blockQuote: renderTextBlock('blockQuote'),
    br: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <Text key={state.key} style={styles.br}>
            {'\n\n'}
        </Text>
    ),
    codeBlock: renderTextBlock('codeBlock'),
    del: renderTextContent('del'),
    em: renderTextContent('em'),
    heading: (node: HeadingNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        renderTextBlock('heading', 'heading' + node.level)(node, output, state, styles)
    ),
    hr: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <View key={state.key} style={styles.hr}/>
    ),
    image: (node: ImageNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => {
        const {imageWrapper: wrapperStyle, image: imageStyle} = styles
        return (

            <ImageMark
                key={state.key}
                src={node.target}/>


        )
    },
    inlineCode: renderTextContent('inlineCode'),
    link: (node: LinkNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => {
        const onPress = state.onLinkPress
        return <Text key={state.key} style={styles.link} onPress={onPress ? () => onPress(node.target) : null}>
            {typeof node.content === 'string' ? node.content : output(node.content, state)}
        </Text>
    },
    list: (node: ListNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <View key={state.key} style={styles.list}>
            {node.items.map((item, i) => (
                <View key={i} style={styles.listItem}>
                    {
                        node.ordered ?
                            <Text style={styles.listItemNumber}>{`${i + 1}.`}</Text>
                            :
                            <Text style={styles.listItemBullet}>
                                {styles.listItemBullet && styles.listItemBullet.content ? styles.listItemBullet.content : '\u2022'}
                            </Text>
                    }
                    <Text style={node.ordered ? styles.listItemOrderedContent : styles.listItemUnorderedContent}>
                        {output(item, state)}
                    </Text>
                </View>
            ))}
        </View>
    ),
    newline: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <Text key={state.key} style={styles.newline}>
            {'\n'}
        </Text>
    ),
    paragraph: renderTextContent('paragraph'),
    strong: renderTextContent('strong'),
    table: (node: TableNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
        <Grid key={state.key} style={styles.table}>
            {[<Row id={1} key={1}>
                {node.header.map((cell, column) => renderTableCell(cell, 1, column + 1, node.cells.length + 1, node.header.length, output, state, styles))}
            </Row>].concat(node.cells.map((cells, row) => (
                <Row id={row + 2} key={row + 2}>
                    {cells.map((cell, column) => renderTableCell(cell, row + 2, column + 1, node.cells.length + 1, cells.length, output, state, styles))}
                </Row>
            )))}
        </Grid>
    ),
    text: renderTextContent('text'),
    u: renderTextContent('u')
})
