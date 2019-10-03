// Bootstrapping for entire application
import { h, render } from 'preact'
import { ThemeApp } from './theme/ThemeApp'

render(<ThemeApp />, document.getElementById('theme-app'))
