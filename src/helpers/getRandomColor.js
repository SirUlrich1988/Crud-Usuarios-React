export const getRandomColor = () => {
    const hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d']
    let color = '#'
    for(let i =0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * hex.length)]
    }
    return color
  }