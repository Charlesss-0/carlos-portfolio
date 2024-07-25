import { navLinks } from '@/src/data'
import styled from 'styled-components'

const NavbarContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	color: #fff;
	width: 100vh;
	padding: 1.5rem;
	transform: rotate(-90deg) translateY(-100%);
	transform-origin: top right;
`

const NavLink = styled.li`
	position: relative;
	width: 6rem;
	display: flex;
	justify-content: center;

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		transform-origin: bottom right;
		transition: transform 0.25s linear;
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`

export default function Navbar() {
	return (
		<NavbarContainer>
			<ul className="flex justify-around font-bold text-xl [&>li>a]:cursor-pointer">
				{navLinks.map(link => (
					<NavLink key={link.id}>
						<a key={link.id} href={link.id}>
							{link.name}
						</a>
					</NavLink>
				))}
			</ul>
		</NavbarContainer>
	)
}