import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Control from './control'
import Games from './games'

const Flip = () => {
  useEffect(() => {
    async function fetchData() {
    }

    fetchData()
  }, [])

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="container">
          {/* Control section */}
          <Control />
          {/* Game list */}
          <Games />
        </div>
      </div>
    </section>
  )
}

Flip.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {  })(Flip)
