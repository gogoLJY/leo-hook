import Cookies from 'js-cookie'

export type ICookieValue = string | undefined | null;
export interface ICookieOptions extends Cookies.CookieAttributes {
}