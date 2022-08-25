export function generateAvatar(name = '', lastname = '') {
    name = name.split(" ", 1)
    lastname = lastname.split(" ", 1)

    const initials = name[0][0].toUpperCase() + lastname[0][0].toUpperCase()

  return initials

}