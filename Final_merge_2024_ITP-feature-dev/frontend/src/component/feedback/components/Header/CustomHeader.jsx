import React from 'react'

export const CustomHeader = () => {
  return (
    <div>
      <div style={{
        backgroundImage: "url('https://www.blue365deals.com/sites/default/files/styles/1240x710_cropped_2x/public/images/AFD_D_V_Lifting_2400px_by_1350px.png?h=618493a0&itok=SuEq0vZF')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%', margin: '0 auto', padding: '1rem'

      }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem' }}>
          <header style={{ padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.25rem' }}>Life Touch Fitness</div>
            <nav>
              <ul style={{ display: 'flex', gap: '3rem' }}>
                <li><a href="/MainHome" style={{ color: 'white', textDecoration: 'none', ':hover': { color: '#d1d5db' } }}>HOME</a></li>
                <li><a href="/csfitness/home" style={{ color: 'white', textDecoration: 'none', ':hover': { color: '#d1d5db' } }}>Class & Schedule</a></li>
                <li><a href="/TrinerHome" style={{ color: 'white', textDecoration: 'none', ':hover': { color: '#d1d5db' } }}>Personal Traniner</a></li>
                <li><a href="/InventoryHome" style={{ color: 'white', textDecoration: 'none', ':hover': { color: '#d1d5db' } }}>Supplement Shop</a></li>
                <li><a href="/INSTRUCTORS" style={{ color: 'white', textDecoration: 'none', ':hover': { color: '#d1d5db' } }}>INSTRUCTORS</a></li>
              </ul>
            </nav>
            <button style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', ':hover': { backgroundColor: '#dc2626' } }}>Login/User</button>
          </header>


          <div style={{ textAlign: 'center', color: 'white', padding: '2rem 1rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>SHAPE YOUR MUSCLE WITH US</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>WE HAVE 1500M2 OF MODERN SPACE TO EXERCISE</p>
            <button style={{ backgroundColor: 'white', color: '#9CA3AF', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', ':hover': { backgroundColor: '#f3f4f6' } }}>LEARN MORE ABOUT THE GYM</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomHeader;