import { default as React } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '../../store/configureStore'
import SearchModal from './searchModal/searchModal'

import FootballBlockEdit from '../block/edit'
import FootballBlockRead from '../block/read'

export default class FootballTool {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path d="M10 17.167q-1.479 0-2.781-.563-1.302-.562-2.281-1.542-.98-.979-1.542-2.281-.563-1.302-.563-2.781 0-1.5.563-2.792.562-1.291 1.542-2.27.979-.98 2.281-1.542Q8.521 2.833 10 2.833q1.5 0 2.792.563 1.291.562 2.27 1.542.98.979 1.542 2.27.563 1.292.563 2.792 0 1.479-.563 2.781-.562 1.302-1.542 2.281-.979.98-2.27 1.542-1.292.563-2.792.563Zm3.438-8.521 1.479-.438L15.5 6.5q-.625-1-1.562-1.698Q13 4.104 11.812 3.75l-1.479 1.062v1.626Zm-6.896-.021 3.125-2.187V4.812L8.188 3.75Q7 4.104 6.073 4.792q-.927.687-1.531 1.687l.583 1.729Zm-1.771 5.25 1.875.021.875-1.146-1.125-3.417-1.438-.416L3.5 10.021q.042 1.062.323 2.021.281.958.948 1.833ZM10 16.5q.542 0 1.094-.104t1.177-.292l.583-1.729-.896-1.229H8.021l-.833 1.229.583 1.729q.562.188 1.125.292.562.104 1.104.104Zm-1.875-4.021h3.771l1.062-3.375L10 7.021 7 9.104Zm7.104 1.417q.667-.875.948-1.834.281-.958.323-2.02l-1.438-1.125-1.458.375-1.125 3.458.875 1.146Z"/></svg>`,
      title: 'Football Info',
    }
  }

  static get isReadOnlySupported() {
    return true
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api
    this.readOnly = readOnly
    this.data = data
    this.blockAdded = false

    this.CSS = {
      baseClass: this.api.styles.block,
      wrapper: 'block',
    }

    this.nodes = {
      wrapper: null,
    }

    this.id = 'id' + Math.random().toString(16).slice(4)
  }

  saveData(data) {
    this.data = data
  }

  deleteBlock() {
    this.api.blocks.delete()
  }

  render() {
    const rootNode = document.createElement('div')
    rootNode.classList.add(this.CSS.baseClass, this.CSS.wrapper)
    this.nodes.wrapper = rootNode

    createRoot(rootNode).render(
      <Provider store={store}>
        <React.StrictMode>
          {this.readOnly ? (
            <FootballBlockRead blockData={this.data} />
          ) : (
            <FootballBlockEdit blockId={this.id} savedblockData={this.data} />
          )}
          {this.readOnly || this.data.isReady ? null : (
            <SearchModal
              blockId={this.id}
              saveData={(data) => this.saveData(data)}
              savedblockData={this.data}
              setBlockAdded={() => this.setBlockAdded()}
              deleteBlock={() => this.deleteBlock()}
            />
          )}
        </React.StrictMode>
      </Provider>
    )

    return this.nodes.wrapper
  }

  save() {
    return this.data
  }
}
