// Bootstrapping for entire application
import { h, render } from 'preact'
import { App } from './app/app'

render(<App name="cool working" />, document.getElementById('app'))
