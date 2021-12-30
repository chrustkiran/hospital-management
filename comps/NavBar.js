import classes from '../styles/NavBar.module.css'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div className={classes.border}>
            <div className={classes.hos}>Hospital Management</div>
            <div className={classes.navbar}>
                <span className={classes.dropdown}>
                    <button className={classes.dropbtn}>Patient
                    </button>
                    <div className={classes.dropdownContent}>
                        <Link href='/patient/view'>
                            <a>View</a>
                        </Link>
                        <Link href='/patient/add'>
                            <a>Add</a>
                        </Link>
                    </div>
                </span>

                <span className={classes.dropdown}>
                    <button className={classes.dropbtn}>Doctor
                    </button>
                    <div className={classes.dropdownContent}>
                        <a href="#">View</a>
                        <a href="#">Add</a>
                    </div>
                </span>

                <span className={classes.dropdown}>
                    <button className={classes.dropbtn}>Nurse
                    </button>
                    <div className={classes.dropdownContent}>
                        <a href="#">View</a>
                        <a href="#">Add</a>
                    </div>
                </span>

                <span className={classes.dropdown}>
                    <button className={classes.dropbtn}>Room
                    </button>
                    <div className={classes.dropdownContent}>
                        <a href="#">View</a>
                        <a href="#">Add</a>
                    </div>
                </span>
            </div>
            <br/><br/>
        </div>
    )
}

export default NavBar