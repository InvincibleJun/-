import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { withRouter } from 'react-router'
import { lightGreen500 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const Container = styled.div`
  width: 340px;
  background-color: #fff;
  height: calc(100vh - 60px);
`

const ButtonGroup = styled.div`
  float: right;
  margin-right: 50px;
`

const ListTitle = styled.div`
  text-align: left;
  font-size: 18px;
  line-height: 20px;
  margin: 10px;
  i {
    margin-right: 8px;
  }
`

const Article = styled.div`
  border-bottom: 1px solid #ccc;
  height: 80px;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
  background-color: ${props => (props.isActive ? '#e6e6e6' : '')};
`

const Create = styled.div`
  cursor: pointer;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  height: 80px;
  i {
    font-size: 18px;
  }
`

const TopSelect = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  & > div > div::after {
    border-bottom-color: ${lightGreen500} !important;
  }
  & > div > div::before {
    border-bottom-color: ${lightGreen500};
  }
  label {
    color: ${lightGreen500} !important;
  }
`

const Controller = styled.div`
  position: absolute;
  right: 5px;
  top: 20px;
`

const TagsController = styled.div``

const Tag = styled.span`
  border: 1px solid ${props => props.color};
  padding: 0 10px;
  border-radius: 4px;
  color: ${props => props.color};
`

const selectType = [
  { value: 'all', label: '全  部' },
  { value: 'draft', label: '草  稿' },
  { value: 'publish', label: '已发布' },
  { value: 'delete', label: '已删除' }
]

class ArticleList extends Component {
  static propTypes = {
    matched: PropTypes.object.isRequired,
    open: PropTypes.func.isRequired,
    // active: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    articleList: PropTypes.array.isRequired
  }

  renderTags(tags) {
    return (
      <TagsController>
        {tags.map(({ _id, color, name }) => {
          return (
            <Tag key={_id} color={color}>
              {name}
            </Tag>
          )
        })}
      </TagsController>
    )
  }

  render() {
    const { open, active, list, push, articleList, matched } = this.props
    const { type, tag } = matched

    return (
      <Container>
        <TopSelect>
          <DropDownMenu
            value={type}
            onChange={(e, index, value) => push('type', value)}
          >
            {selectType.map(({ value, label }) => (
              <MenuItem
                key={value}
                insetChildren={true}
                value={value}
                primaryText={label}
              />
            ))}
          </DropDownMenu>
          <DropDownMenu
            value={tag}
            onChange={(e, index, value) => push('tag', value)}
          >
            {[{ name: '全部', _id: 'all' }, ...list].map(({ _id, name }) => (
              <MenuItem
                key={_id}
                insetChildren={true}
                value={name}
                primaryText={name}
              />
            ))}
          </DropDownMenu>
        </TopSelect>

        <Create onClick={() => push('_id', 'new')}>
          <i className="iconfont icon-plus" />
          新建文章
        </Create>
        {articleList.map((val, key) => {
          return (
            <Article
              key={key}
              isActive={active && active._id === val._id}
              onClick={() => open(val._id)}
            >
              <ListTitle>
                <i className="iconfont icon-file" />
                {val.title}
              </ListTitle>
              <Controller>
                <IconMenu
                  iconButtonElement={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                  <MenuItem primaryText="发布" />
                  <MenuItem primaryText="删除" />
                </IconMenu>
              </Controller>
              <ButtonGroup>
                {this.renderTags(val.tags)}
                <div>{moment(val.updateTime).format('YYYY-MM-DD')}</div>
              </ButtonGroup>
            </Article>
          )
        })}
      </Container>
    )
  }
}

export default withRouter(ArticleList)
