using System.Threading.Tasks;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using EcommerceApi.Dtos;
using EcommerceApi.ErrorHandle;
using EcommerceApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager,
            ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.GetUserByEmailAsync(User);
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto)
        {
            var user = await _userManager.GetUserWithAddressAsync(User);
            user.Address = _mapper.Map<AddressDto, Address>(addressDto);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return _mapper.Map<Address, AddressDto>(user.Address);
            return BadRequest("Preblem updating");
        }

        [HttpGet("checkemail")]
        public async Task<ActionResult<bool>> CheckEmailExist([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpGet("address")]
        [Authorize]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var user = await _userManager.GetUserWithAddressAsync(User);
            return _mapper.Map<Address, AddressDto>(user.Address);
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ErrorResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ErrorResponse(401));
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // if ((await CheckEmailExist(registerDto.Email)).Value)
            //     return BadRequest(new ApiValidationResponse {Errors = new[] {"Email already exists"}});

            var user = new AppUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(new ErrorResponse(400));
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}