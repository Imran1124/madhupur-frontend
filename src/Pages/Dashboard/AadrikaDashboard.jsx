import React from 'react';
import "./Aadrika/aadrika.css";
import People from "./Aadrika/img/people.png";
import {FaSchool} from 'react-icons/fa';
import {FcPortraitMode,FcLeave} from 'react-icons/fc';
// import {PiStudent} from "react-icons/pi";
//https://github.com/fajarnurwahid/adminhub/blob/master/index.html

export default function AadrikaDashboard() {
  return <div className="block h-[84v] overflow-auto bg-white">
    <section id="content">
		
		<main>
			

			<ul class="box-info">
				<li className='bg-[#ffe4e6]'>
					<i class='bx bxs-calendar-check' ><FaSchool/></i>
					<span class="text">
						<h3>20</h3>
						<p>Number of Schools</p>
					</span>
				</li>
				<li  className='bg-[#cffafe]'>
					<i class='bx bxs-group' ><FcPortraitMode/></i>
					<span class="text">
						<h3>15</h3>
						<p>Active Schools</p>
					</span>
				</li>
				<li className='bg-[#fed7aa]'>
					<i class='bx bxs-dollar-circle' ><FcLeave/></i>
					<span class="text">
						<h3>5</h3>
						<p>Deactive Schools</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Recent Orders</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Date Order</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<img src={People} alt="people"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Active</span></td>
							</tr>
							<tr>
								<td>
									<img src={People} alt="people"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Active</span></td>
							</tr>
							<tr>
								<td>
									<img src={People} alt="people"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Active</span></td>
							</tr>
							<tr>
								<td>
									<img src={People} alt="people"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Deactive</span></td>
							</tr>
							<tr>
								<td>
									<img src={People} alt="people"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Deactive</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="container">
				
					<div className="box">
    <div className="shadow"></div>
    <div class="content">Number of Schools
      <div class="percent" style={{ strokeDashoffset: `calc(${440 - (440 * ((20/20)*100)) / 100})`,animation: `fadeIn 1s linear forwards`}} >
        {/* <div class="dot"></div> */}
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
      </div>
      <div className="number">
        <h2>100<span>%</span></h2>
      </div>
    </div>
  </div>

  <div className="box">
    <div className="shadow"></div>
    <div className="content">Active
      <div className="percent" style={{ strokeDashoffset: `calc(${440 - (440 * ((15/20)*100)) / 100})`,animation: `fadeIn 1s linear forwards`}}  >
        {/* <div class="dot"></div> */}
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
      </div>
      <div className="number">
        <h2>{Math.round((15/20)*100)}<span>%</span></h2>
      </div>
    </div>
  </div>

  <div className="box">
    <div className="shadow"></div>
    <div className="content">Deactive
      <div className=" percent" style={{ strokeDashoffset: `calc(${440 - (440 * ((5/20)*100)) / 100})`,animation: `fadeIn 1s linear forwards`}} >
        {/* <div className="dot"></div> */}
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
      </div>
      <div className="number">
	 
        <h2>{Math.round((5/20)*100)}<span>%</span></h2>
      </div>
    </div>
  </div>
				</div>
			</div>
		</main>
	</section>
    
  </div>;
}
